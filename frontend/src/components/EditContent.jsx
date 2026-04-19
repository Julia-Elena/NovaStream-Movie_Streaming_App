import React, { useState, useEffect } from "react";
import NavbarMain from "./navbar/NavbarMain";
import { supabase } from "../supabaseClient";

const EditContent = () => {
	return (
		<>
			<NavbarMain />
			<div className="min-h-screen bg-base-300 pb-10">
				<header className="text-white text-2xl text-center font-bold py-5">
					Edit Content
				</header>
			</div>
		</>
	);
};

export default EditContent;
