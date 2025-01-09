import { useState } from "react";
import { toast } from "./use-toast";

type Report = {
  title: string;
  isOK: boolean;
};

interface ApiResponseSummary {
  success: boolean;
  message: string;
  data: Summary | null;
}

interface Summary {
  from: string; // ISO 8601 format
  to: string; // ISO 8601 format
  problems: Problem[];
}

interface Problem {
  id: string;
  name: string;
  desc: string;
  labels: string[];
  isError: boolean;
  isInsight: boolean;
  priority: number;
  count: number;
  alerts: Alert[];
}

interface Alert {
  eventId: string;
  eventTime: string; // ISO 8601 format
  host: Host;
}

interface Host {
  id: string;
  refCode: string;
  name: string;
  desc: string;
  ip: string;
}

export const useClickhouseReport = () => {
  const [report, setReport] = useState<Report[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchReport = async () => {
    setIsLoadingReport(true);
    const response = await fetch(`${baseUrl}/api/v1/alerts/report-summary`);
    const data = await response.json();
    if (data.data) {
      setReport(data.data);
    } else {
      toast({
        title: "Error fetching report",
        description: data.message,
        variant: "destructive",
      });
    }
    setIsLoadingReport(false);
  };

  const fetchSummary = async () => {
    setIsLoadingSummary(true);
    const response = await fetch(`${baseUrl}/api/v1/alerts/report-summary`);
    const data: ApiResponseSummary = await response.json();
    if (data.data) {
      setSummary(data.data);
    } else {
      toast({
        title: "Error fetching summary",
        description: data.message,
        variant: "destructive",
      });
    }
    setIsLoadingSummary(false);
  };

  const setClickhouseReport = () => {
    fetchReport();
    fetchSummary();
  };

  return {
    report,
    fetchReport,
    summary,
    fetchSummary,
    setClickhouseReport,
    isLoadingReport,
    isLoadingSummary,
  };
};
