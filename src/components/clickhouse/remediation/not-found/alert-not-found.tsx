export const AlertNotFound = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Alert not found</h1>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Please try again.
      </p>
    </div>
  );
};
