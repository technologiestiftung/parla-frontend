import React from "react";

export function Table({ children }: { children: React.ReactNode }) {
	return <table className="table-auto min-w-full">{children} </table>;
}
