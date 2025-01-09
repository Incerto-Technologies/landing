import { useState } from "react";
import { toast } from "./use-toast";
import {
  ClickhouseSummaryData,
  RemediationConfig,
} from "../types/clickhouse.types";
import { ApiResponse } from "@/types/server.type";
import { fetchWithAuth } from "@/utils/fetch-with-auth";

// Helper function to check if a node matches search
const nodeMatchesSearch = (
  node: ClickhouseSummaryData,
  search: string
): boolean => {
  const searchLower = search.toLowerCase();
  // Check if any remediation in the node matches
  if (node.remediations?.length) {
    if (
      node.remediations.some(
        (config) =>
          config.name.toLowerCase().includes(searchLower) ||
          config.desc.toLowerCase().includes(searchLower) ||
          config.labels?.some((label) =>
            label.toLowerCase().includes(searchLower)
          )
      )
    ) {
      return true;
    }
  }
  // Check children recursively
  return (
    node.children?.some((child) => nodeMatchesSearch(child, search)) || false
  );
};

// Filter tree based on search
const filterTree = (
  node: ClickhouseSummaryData,
  search: string
): ClickhouseSummaryData | null => {
  if (!search) return node;

  // Check if any remediation in the node matches
  const currentNodeMatches = node.remediations?.some(
    (config) =>
      config.name.toLowerCase().includes(search.toLowerCase()) ||
      config.desc.toLowerCase().includes(search.toLowerCase()) ||
      config.labels?.some((label) =>
        label.toLowerCase().includes(search.toLowerCase())
      )
  );

  // Process children
  const filteredChildren = node.children
    ?.map((child) => filterTree(child, search))
    .filter((child): child is ClickhouseSummaryData => child !== null);

  // If current node matches or any children match, include this node
  if (currentNodeMatches || (filteredChildren && filteredChildren.length > 0)) {
    return {
      ...node,
      children: filteredChildren,
    };
  }

  return null;
};

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
        remediations: [config],
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
          remediationConfig: config,
          remediations: [config],
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
      } else {
        // Add the config to existing node's remediations if it's not already there
        if (!node.remediations) {
          node.remediations = [config];
        } else if (!node.remediations.some((r) => r.id === config.id)) {
          node.remediations.push(config);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [originalSummary, setOriginalSummary] = useState<
    ClickhouseSummaryData[]
  >([]);

  const getSummary = async () => {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL;
    const summary = await fetchWithAuth(
      `${baseUrl}/api/v1/alerts/config-remediations`
    );
    // const summary = await fetch(`/config.json`);
    const data: ApiResponse<RemediationConfig[]> = await summary.json();
    console.log(data, "summary");
    setIsLoading(false);
    return data.data;
  };

  const setSummaryData = async () => {
    const data = await getSummary();
    if (data && data.length > 0) {
      const labelTree = createLabelTree(data);
      setOriginalSummary(labelTree);
      setSummary(labelTree);
    } else {
      toast({
        title: "No alerts found",
        description: "Please check back later",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSummary(originalSummary);
      return;
    }

    const filteredSummary = originalSummary
      .map((node) => filterTree(node, term))
      .filter((node): node is ClickhouseSummaryData => node !== null);

    setSummary(filteredSummary);
  };

  return {
    summary,
    isLoading,
    setSummaryData,
    searchTerm,
    handleSearch,
  };
};
