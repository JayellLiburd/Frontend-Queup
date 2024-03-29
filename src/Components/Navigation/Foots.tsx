import React from "react";
import styled from "styled-components";

function Foots() {
	return (
		<Wrapper>
			<footer>
				<div id="foots">
					<ul>
						<p>
							<button>Veiw Your Account</button>
						</p>
						<p>
							<button>Policies</button>
						</p>
						<p>
							<button>Terms of Service</button>
						</p>
						<p>
							<button>Cookie Settings</button>
						</p>
					</ul>
					<ul>
						<p>
							<button>Careers</button>
						</p>
						<p>
							<button>Advertising</button>
						</p>
						<p>
							<button>Instagram</button>
						</p>
						<p>
							<button>Facebook</button>
						</p>
					</ul>
					<ul>
						<p>
							<button>Questions</button>
						</p>
						<p>
							<button>Account</button>
						</p>
						<p>
							<button>Accessibility</button>
						</p>
						<p>
							<button>Help</button>
						</p>
					</ul>
				</div>
			</footer>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 3rem 0;
	/* margin-top: 3rem; */
	width: 100%;
	background-color: whitesmoke;
	border-top: 2px grey solid;
	button {
		all: unset;
		&:hover {
			text-decoration: underline solid white;
			color: #707070;
			cursor: pointer;
		}
	}
	#foots {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* color: white; */
		font-weight: bold;
		@media (max-width: 1400px) {
			flex-direction: row;
			font-size: 0.5rem;
		}
	}
	ul {
		margin: 0 8rem;
		width: 10rem;
		font-family: sans-serif;
		@media (max-width: 1400px) {
			margin: 0rem;
			width: 5rem;
			margin-left: -0.5rem;
		}
	}
`;

export default Foots;
