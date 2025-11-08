import React, { useContext, useEffect, useState } from "react";
import {
	Alert,
	Box,
	Button,
	Card,
	Divider,
	Fab,
	IconButton,
	MenuItem,
	Select,
	Snackbar,
	Tab,
	Tabs,
	Typography,
	FormControl,
	InputLabel,
} from "@mui/material";
import axios from "axios";
import { api } from "../../../../Global/localhost";
import { MyContext } from "../../../../Global/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Createactionsdialogue from "../../../utils/Createactionsdialogue";
import PublishIcon from "@mui/icons-material/Publish";
import HelpDialog from "../../../utils/HelpDialog";

const HelpRequests = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const { userid } = useContext(MyContext);
	const [helpRequests, setHelpRequests] = useState({});
	const [actionDialogOpen, setActionDialogOpen] = useState(false);
	const [tabIdentifier, setTabIdentifier] = useState();
	const [openInfoDialogue, setOpenInfoDialogue] = useState(false);
	const [post, setPost] = useState();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	// Filter & sort states
	const [selectedLocation, setSelectedLocation] = useState("");
	const [sortOrder, setSortOrder] = useState("newest");

	const handleTabIndexChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const fetchData = async () => {
		try {
			const fetchResponse = await axios.get(
				`${api}/actionresponse/get-help-requests/${userid}`
			);
			setHelpRequests(fetchResponse.data);
		} catch (error) {
			setSnackbarMessage(
				error.response?.data?.message || "Something went wrong"
			);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${api}/actions/delete-help/${id}`);
			setSnackbarMessage("Help Request Deleted Successfully");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
			fetchData();
		} catch (error) {
			setSnackbarMessage(
				error.response?.data?.message || "Something went wrong"
			);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	const handleClose = async () => {
		setActionDialogOpen(false);
		fetchData();
	};

	const handleCreateHelpRequest = async () => {
		setTabIdentifier("help");
		setActionDialogOpen(true);
	};

	const handleresponse = async (id) => {
		try {
			await axios.post(`${api}/actions/help-response`, {
				id,
				userid,
			});
			setSnackbarMessage("Response Posted Successfully");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
			fetchData();
		} catch (error) {
			setSnackbarMessage(
				error.response?.data?.message || "Something went wrong"
			);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	const handleviewrequest = async (post) => {
		if (post) {
			setPost(post);
			setOpenInfoDialogue(true);
		}
	};

	const handleRequestDialogClose = async () => {
		setOpenInfoDialogue(false);
		fetchData();
	};

	// ---------- FILTER & SORT ----------
	const allPosts = helpRequests.othersPosts || [];
	const uniqueLocations = [...new Set(allPosts.map((p) => p.location))];

	// Apply location filter
	let filteredPosts = selectedLocation
		? allPosts.filter((p) => p.location === selectedLocation)
		: allPosts;

	// Sort by date
	filteredPosts = filteredPosts.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
	});

	// Split into responded and not responded
	const respondedPosts = filteredPosts.filter((post) =>
		post.responders?.some((id) => id.toString() === userid.toString())
	);
	const notRespondedPosts = filteredPosts.filter(
		(post) =>
			!post.responders?.some((id) => id.toString() === userid.toString())
	);

	return (
		<div>
			<Box
				sx={{
					backgroundColor: "#1E201E",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-around",
					width: "100%",
				}}
			>
				<Tabs
					value={tabIndex}
					variant="fullWidth"
					onChange={handleTabIndexChange}
					indicatorColor="inherit"
					sx={{
						height: "2rem",
						position: "fixed",
						width: "100%",
						display: "flex",
						background: "#1E201E",
						alignItems: "center",
						".MuiTab-textColorPrimary": {
							color: "#ffffff55 !important",
						},
						".Mui-selected": { color: "white !important" },
						zIndex: "1",
						paddingBottom: "2rem",
					}}
				>
					<Tab label="Help Requests" />
					<Tab label="Your Requests" />
				</Tabs>

				<Box
					sx={{
						width: "100%",
						paddingTop: "5rem",
						height: "max-content",
						background: "#1E201E",
					}}
				>
					{tabIndex === 0 ? (
						<>
							{/* Filter & Sort Controls */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center",
									padding: "1rem 2rem",
								}}
							>
								<FormControl
									sx={{
										width: "40%",
										background: "#4d4e48",
										borderRadius: "2rem",
										marginBottom: "1rem",
										"& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink":
											{
												display: "none",
											},
										"& .MuiSelect-icon": {
											color: "#999",
										},
										"& .MuiOutlinedInput-root": {
											"&:hover fieldset": {
												border: "none", // hover color
											},
											"&.Mui-focused fieldset": {
												border: "none", // focused border
											},
										},
										"& .MuiInputBase-input": {
											color: "#fff", // input text color
										},
									}}
									size="small"
								>
									<InputLabel
										sx={{
											color: "#999",
										}}
									>
										Filter by Location
									</InputLabel>
									<Select
										value={selectedLocation}
										label="Filter by Location"
										onChange={(e) =>
											setSelectedLocation(e.target.value)
										}
									>
										<MenuItem
											value=""
											sx={{ color: "#fff" }}
										>
											All
										</MenuItem>
										{uniqueLocations.map((loc) => (
											<MenuItem
												key={loc}
												value={loc}
												sx={{ color: "#fff" }}
											>
												{loc}
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<FormControl
									sx={{
										width: "30%",
										background: "#4d4e48",
										borderRadius: "2rem",
										marginBottom: "1rem",
										"& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink":
											{
												display: "none",
											},
										"& .MuiSelect-icon": {
											color: "#999",
										},
										"& .MuiOutlinedInput-root": {
											"&:hover fieldset": {
												border: "none", // hover color
											},
											"&.Mui-focused fieldset": {
												border: "none", // focused border
											},
										},
										"& .MuiInputBase-input": {
											color: "#999", // input text color
										},
									}}
									size="small"
								>
									<InputLabel>Sort by Date</InputLabel>
									<Select
										value={sortOrder}
										label="Sort by Date"
										onChange={(e) =>
											setSortOrder(e.target.value)
										}
									>
										<MenuItem
											value="newest"
											sx={{ color: "#999" }}
										>
											Newest First
										</MenuItem>
										<MenuItem
											value="oldest"
											sx={{ color: "#999" }}
										>
											Oldest First
										</MenuItem>
									</Select>
								</FormControl>
							</Box>

							{/* Not Responded Posts */}
							{notRespondedPosts.length > 0 && (
								<>
									<Typography
										sx={{
											color: "white",
											fontSize: "1.2rem",
											paddingLeft: "1.5rem",
											marginBottom: "0.5rem",
										}}
									>
										Available Requests
									</Typography>
									<Box
										sx={{
											width: "100%",
											display: "flex",
											flexWrap: "wrap",
											gap: "1rem",
											padding: "0 1rem",
											boxSizing: "border-box",
										}}
									>
										{notRespondedPosts.map((post) => (
											<Card
												key={post._id}
												sx={{
													width: "calc(31% - 1rem)",
													padding: "1rem",
													background: "#3C3D37",
													color: "white",
												}}
											>
												<Typography
													sx={{ fontSize: "1.1rem" }}
												>
													{post.title}
												</Typography>
												<Divider
													sx={{
														background: "#ffffff44",
														margin: "1rem 0",
													}}
												/>
												<Typography>
													{post.description}
												</Typography>
												<Typography
													sx={{ paddingTop: "1rem" }}
												>
													Posted on:{" "}
													{post.createdAt
														.substring(0, 10)
														.split("-")
														.reverse()
														.join("-")}
												</Typography>
												<Typography>
													Location: {post.location}
												</Typography>
												<Typography>
													Contact: {post.contact}
												</Typography>

												<Box
													sx={{
														width: "100%",
														display: "flex",
														justifyContent: "end",
													}}
												>
													<Button
														onClick={() =>
															handleresponse(
																post._id
															)
														}
														sx={{
															background:
																"#697565",
															color: "white",
														}}
													>
														<PublishIcon
															sx={{
																padding:
																	"0 1rem 0 0",
															}}
														/>
														<Typography>
															Respond
														</Typography>
													</Button>
												</Box>
											</Card>
										))}
									</Box>
								</>
							)}

							{/* Responded Posts */}
							{respondedPosts.length > 0 && (
								<Box sx={{ marginBottom: "5rem" }}>
									<Typography
										sx={{
											color: "white",
											fontSize: "1.2rem",
											paddingLeft: "1.5rem",
											marginBottom: "0.5rem",
											marginTop: "1rem",
										}}
									>
										Responded Requests
									</Typography>
									<Box
										sx={{
											width: "100%",
											display: "flex",
											flexWrap: "wrap",
											gap: "1rem",
											padding: "0 1rem",
											boxSizing: "border-box",
										}}
									>
										{respondedPosts.map((post) => (
											<Card
												key={post._id}
												sx={{
													width: "calc(31% - 1rem)",
													padding: "1rem",
													background: "#3C3D37",
													color: "white",
												}}
											>
												<Typography
													sx={{ fontSize: "1.1rem" }}
												>
													{post.title}
												</Typography>
												<Divider
													sx={{
														background: "#ffffff44",
														margin: "1rem 0",
													}}
												/>
												<Typography>
													{post.description}
												</Typography>
												<Typography
													sx={{ paddingTop: "1rem" }}
												>
													Posted on:{" "}
													{post.createdAt
														.substring(0, 10)
														.split("-")
														.reverse()
														.join("-")}
												</Typography>
												<Typography>
													Location: {post.location}
												</Typography>
												<Typography>
													Contact: {post.contact}
												</Typography>

												<Box
													sx={{
														width: "100%",
														display: "flex",
														justifyContent: "end",
													}}
												>
													<Button
														disabled
														sx={{
															background: "#888",
															color: "white",
														}}
													>
														<PublishIcon
															sx={{
																padding:
																	"0 1rem 0 0",
															}}
														/>
														<Typography>
															Responded
														</Typography>
													</Button>
												</Box>
											</Card>
										))}
									</Box>
								</Box>
							)}
						</>
					) : (
						// Your own posts tab
						<Box
							sx={{
								width: "100%",
								display: "flex",
								flexWrap: "wrap",
								gap: "1rem",
								padding: "0 1rem",
								boxSizing: "border-box",
							}}
						>
							{helpRequests.userPosts?.length > 0 ? (
								helpRequests.userPosts.map((post) => (
									<Card
										key={post._id}
										onClick={() => handleviewrequest(post)}
										sx={{
											width: "calc(31% - 1rem)",
											padding: "1rem",
											cursor: "pointer",
											background: "#3C3D37",
											color: "white",
										}}
									>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Typography
												sx={{ fontSize: "1.1rem" }}
											>
												{post.title}
											</Typography>
											<IconButton
												onClick={(e) => {
													e.stopPropagation();
													handleDelete(post._id);
												}}
											>
												<DeleteIcon
													sx={{ color: "white" }}
												/>
											</IconButton>
										</Box>
										<Divider
											sx={{
												background: "#ffffff44",
												margin: "1rem 0",
											}}
										/>
										<Typography>
											{post.description}
										</Typography>
										<Typography sx={{ paddingTop: "1rem" }}>
											Posted on :{" "}
											{post.createdAt
												.substring(0, 10)
												.split("-")
												.reverse()
												.join("-")}
										</Typography>
										<Typography>
											Location : {post.location}
										</Typography>
										<Typography>
											Contact : {post.contact}
										</Typography>
									</Card>
								))
							) : (
								<Typography
									width={"100%"}
									sx={{
										color: "white",
										textAlign: "center",
										fontSize: "1.5rem",
									}}
								>
									No help requests available
								</Typography>
							)}
						</Box>
					)}

					<Fab
						onClick={handleCreateHelpRequest}
						size="small"
						sx={{
							position: "fixed",
							bottom: 0,
							right: 0,
							margin: "2rem",
						}}
					>
						<AddIcon />
					</Fab>
				</Box>
			</Box>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			<Createactionsdialogue
				open={actionDialogOpen}
				handleClose={handleClose}
				tabIdentifier={tabIdentifier}
				userData={userid}
			/>
			<HelpDialog
				open={openInfoDialogue}
				handleClose={handleRequestDialogClose}
				data={post || {}}
			/>
		</div>
	);
};

export default HelpRequests;
