import { useState } from "react";
import { toast } from "./use-toast";
import {
  ClickhouseSummaryData,
  RemediationConfig,
} from "../types/clickhouse.types";
import { ApiResponse } from "@/types/server.type";

const createLabelTree = (
  configs: RemediationConfig[]
): ClickhouseSummaryData[] => {
  const rootNodes: ClickhouseSummaryData[] = [];
  const labelMap = new Map<string, ClickhouseSummaryData>();

  // Helper function to update node metrics
  const updateNodeMetrics = (node: ClickhouseSummaryData) => {
    let currentErrors = 0;
    let currentInsights = 0;
    let latestFiringAt = node.recentFiringAlertAt;

    // Add errors and insights from children
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        currentErrors += child.totalNoOfErrors;
        currentInsights += child.totalNoOfInsights;
      });
    }

    // Update node with accumulated totals
    node.totalNoOfErrors = currentErrors;
    node.totalNoOfInsights = currentInsights;
    node.recentFiringAlertAt = latestFiringAt;
  };

  // Process each config
  configs.forEach((config) => {
    if (!config.labels || config.labels.length === 0) {
      // Handle configs with no labels
      const noLabelNode = labelMap.get("No Label") || {
        label: "No Label",
        remediationConfig: config,
        totalNoOfInsights: 0,
        totalNoOfErrors: 0,
        recentFiringAlertAt: null,
        children: [],
      };
      updateNodeMetrics(noLabelNode);
      labelMap.set("No Label", noLabelNode);
      if (!rootNodes.includes(noLabelNode)) {
        rootNodes.push(noLabelNode);
      }
      return;
    }

    // Process labels in order to create nested structure
    let currentParent: ClickhouseSummaryData | null = null;
    const nodesToUpdate = new Set<ClickhouseSummaryData>();

    config.labels.forEach((label: string, index: number) => {
      const path = config.labels.slice(0, index + 1).join("/");
      let node = labelMap.get(path);

      if (!node) {
        node = {
          label,
          remediationConfig:
            index === config.labels.length - 1 ? config : undefined,
          totalNoOfInsights: 0,
          totalNoOfErrors: 0,
          recentFiringAlertAt: null,
          children: [],
        };
        labelMap.set(path, node);

        if (index === 0) {
          rootNodes.push(node);
        } else if (currentParent) {
          currentParent.children?.push(node);
        }
      }

      nodesToUpdate.add(node);
      currentParent = node;
    });

    // Update metrics for all nodes in reverse order (leaf to root)
    Array.from(nodesToUpdate)
      .reverse()
      .forEach((node) => {
        updateNodeMetrics(node);
      });
  });

  // Sort nodes by label
  const sortNodes = (nodes: ClickhouseSummaryData[]) => {
    nodes.sort((a, b) => a.label.localeCompare(b.label));
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortNodes(node.children);
      }
    });
  };

  sortNodes(rootNodes);
  return rootNodes;
};

// Most of the logic of clickhouse summary page
export const useClickhouseSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<ClickhouseSummaryData[]>([]);

  const getSummary = async () => {
    setIsLoading(true);
    // const apiUrl = import.meta.env.VITE_API_URL;
    const summary = await fetch(`/config.json`);
    // const summary = await fetch(`${apiUrl}/api/v1/alerts/config-remediations`);
    const data: ApiResponse<RemediationConfig[]> = await summary.json();
    console.log(data, "summary");
    setIsLoading(false);
    return data.data;
  };

  const setSummaryData = async () => {
    const data = await getSummary();
    if (data && data.length > 0) {
      // Each RemediationConfig already contains problemSummaries array
      const labelTree = createLabelTree(data);
      console.log(labelTree, "labelTree");
      setSummary(labelTree);
    } else {
      toast({
        title: "No alerts found",
        description: "Please check back later",
        variant: "destructive",
      });
    }
  };

  return {
    summary,
    isLoading,
    setSummaryData,
  };
};
