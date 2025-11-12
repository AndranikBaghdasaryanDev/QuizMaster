import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "./miniHelpers/loader";

export const OAuthSuccess = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
			setTimeout(() => {
				navigate("/profile");
			}, 2000);
		} else {
			navigate("/login");
		}
	}, [token, navigate]);

	return <Loader />;
};

