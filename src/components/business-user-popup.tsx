"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function BusinessUserPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show popup on the home page
    if (pathname === "/") {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Close popup if user navigates away from home page
      setOpen(false);
    }
  }, [pathname]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoToIncerto = () => {
    // Redirect to incerto.ai
    window.open("https://incerto.ai", "_blank");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you a business user?</DialogTitle>
          <DialogDescription>
            If you&apos;re looking for enterprise solutions or business
            features, you might want to check out our business platform at
            incerto.ai
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Stay here
          </Button>
          <Button onClick={handleGoToIncerto} className="w-full sm:w-auto">
            Go to incerto.ai
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
