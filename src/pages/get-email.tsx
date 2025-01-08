import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const GetEmail = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("remediation-email");
    if (email) {
      setEmail(email);
      setSuccess(true);
    }
  }, []);

  const handleContactSubmit = async () => {
    const res = await fetch("https://incerto.in/api/magicpill/remediation", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log(data);
    sessionStorage.setItem("remediation-email", email);
    setSuccess(true);
  };

  return (
    <div>
      {!success ? (
        <div className="flex flex-col gap-2 max-w-[500px] mx-auto">
          <h3 className="text-2xl font-semibold capitalize">
            Let's know you better
          </h3>
          <p className="text-sm text-gray-500">
            Enter your email to get access to the clickhouse remediation list
          </p>
          <Input
            type="email"
            placeholder="joe@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button onClick={handleContactSubmit}>Submit</Button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
