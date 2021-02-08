import React, { useEffect, useState } from "react";
import {
	withStyles,
	Theme,
	createStyles,
	makeStyles,
} from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from "@material-ui/core";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

interface UsersData {
	id: number;
	name: string;
	email: string;
	birth: string;
	userType: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 14,
		},
	})
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			"&:nth-of-type(odd)": {
				backgroundColor: theme.palette.action.hover,
			},
		},
	})
)(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const Users: React.FC = () => {
	const [users, setUsers] = useState<UsersData[]>();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		api.get("/users").then((response) => {
			setUsers(response.data);
		});
	}, []);

	const handleClick = () => {
		history.push("/register");
	};

	return (
		<S.Container>
			<TableContainer component={Paper}>
				<Table
					className={classes.table}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<StyledTableRow>
							<StyledTableCell>User id</StyledTableCell>
							<StyledTableCell align="right">Name</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Birthday</StyledTableCell>
							<StyledTableCell align="right">User type</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{users &&
							users.map((user) => (
								<StyledTableRow key={user.id}>
									<StyledTableCell component="th" scope="row">
										{user.id}
									</StyledTableCell>
									<StyledTableCell align="right">{user.name}</StyledTableCell>
									<StyledTableCell align="right">{user.email}</StyledTableCell>
									<StyledTableCell align="right">{user.birth}</StyledTableCell>
									<StyledTableCell align="right">
										{user.userType}
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				onClick={handleClick}
				className="button"
				variant="contained"
				color="primary"
			>
				Create user
			</Button>
		</S.Container>
	);
};

export default Users;
