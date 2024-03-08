import AuthUI from "@/components/Auth";
import UIProviders from "@/components/UIProviders";
import React from "react";

export default function AuthScreen() {
	return (
		<UIProviders hasScrollView={false} className="h-full w-full flex-col items-center justify-center align-middle">
			<AuthUI />
		</UIProviders>
	);
}
