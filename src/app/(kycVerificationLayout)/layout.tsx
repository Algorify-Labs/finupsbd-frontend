import React from "react";

const KycVerificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-muted/50 to-background">{children}</main>
    </>
  );
};

export default KycVerificationLayout;
