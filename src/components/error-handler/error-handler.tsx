import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-xl mb-4">We're sorry for the inconvenience.</p>
      <p className="text-lg mb-8">Error: {errorMessage}</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Go to Home
      </Link>
    </div>
  );
};
