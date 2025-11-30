import React, { useState } from "react";

const AgriculturePage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
          <p className="text-lg text-muted-foreground animate-pulse">
            Loading Agriculture Service...
          </p>
        </div>
      )}

      <iframe
        src="http://localhost:5174/"
        title="Agriculture Service"
        className="flex-1 w-full border-none"
        style={{
          height: "calc(100vh - 64px)",
          overflow: "auto",
          zIndex: 0,
        }}
        loading="lazy"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default AgriculturePage;
