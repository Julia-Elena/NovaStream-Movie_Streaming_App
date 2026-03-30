import React, { useState, useEffect } from "react";
import NavbarMain from "./navbar/NavbarMain";
import { supabase } from "../supabaseClient";

const History = () => {
	return (
		<>
			<NavbarMain />
			<div className="bg-base-300 min-h-screen"></div>
		</>
	);
};

export default History;
