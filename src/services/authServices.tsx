const API_URL = import.meta.env.VITE_API_URL;

type ForgotPasswordResponse = { message: string };

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  // Even though your backend usually returns 200, keep this robust:
  const data = (await res.json().catch(() => null)) as ForgotPasswordResponse | null;

  if (!res.ok) {
    throw new Error(data?.message || "Forgot password request failed");
  }

  return data ?? { message: "OK" };
}
