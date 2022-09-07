async function logout() {
	console.log("you are in logout function");
	const response = await fetch("/api/users/logout", {
		method: "post",
		headers: { "Content-Type": "application/json" },
	});
	console.log("past the fetch");
	if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

document.querySelector("#logout").addEventListener("click", logout);
