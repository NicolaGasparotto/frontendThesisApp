import React, { useState } from "react";

import {
  useTheme,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  CardHeader,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ProfessorApplicantsPage() {
  /*
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [proposals, setProposals] = useState([]);
  */
  const handleClicked = () => {
    console.log("clicked");
  };

  const [showApplicants, setShowApplicants] = useState({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Toggle function for showing/hiding applicants
  const toggleApplicants = (proposalId) => {
    setShowApplicants((prevShow) => ({
      ...prevShow,
      [proposalId]: !prevShow[proposalId],
    }));
  };

  // Render the table head with field names based on screen size
  const renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell>Student Name</TableCell>
        {(!isSmallScreen || isMediumScreen) && (
          <TableCell>Student Email</TableCell>
        )}
        {!isSmallScreen && !isMediumScreen && (
          <TableCell>Student Degree</TableCell>
        )}
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );

  // Render the table rows with applicant information based on screen size
  const renderTableRows = (applicants) => (
    <TableBody>
      {applicants.map((applicant) => (
        <TableRow key={applicant.student_id}>
          <TableCell>{applicant.student_name}</TableCell>
          {(!isSmallScreen || isMediumScreen) && (
            <TableCell>{applicant.student_email}</TableCell>
          )}
          {!isSmallScreen && !isMediumScreen && (
            <TableCell>{applicant.student_degree}</TableCell>
          )}
          <TableCell>
            {/* Buttons or status indicators */}
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  /* Accept logic here */
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  /* Decline logic here */
                }}
              >
                Decline
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "4rem",
          height: "100vh",
        }}
      >
        {groupedByProposalArray.map((application) => (
          <Card
            key={application.proposal_id}
            variant="outlined"
            sx={{
              borderRadius: "18px",
              padding: "1rem",
              backgroundColor: "white",
              transition: "background-color 0.3s", // Smooth transition for background color change
              "&:hover": {
                backgroundColor: "#F5F5F5", // Light grey color on hover
              },
              cursor: "pointer", // Change the cursor to indicate the card is clickable
            }}
            onClick={() => toggleApplicants(application.proposal_id)}
          >
            <CardHeader
              title={
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#03468f" }}
                >
                  {application.proposal_title}
                </Typography>
              }
              action={
                isSmallScreen ? (
                  <IconButton
                    size="large"
                    sx={{
                      color: "#03468f",
                      backgroundColor: "#ffe0c8",
                      padding: "12px",
                      borderRadius: "15px", // adjust this value for more or less rounded corners
                      "&:hover": {
                        backgroundColor: "#ffd0b0", // slightly darker on hover for a visual feedback
                      },
                      // Ensure the children are centered, and the icon button maintains a square shape
                      height: "48px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(event) => {
                      // Prevent click event from bubbling to the parent components
                      event.stopPropagation();
                      toggleApplicants(application.proposal_id);
                    }}
                  >
                    <VisibilityIcon />
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: "8px", fontWeight: "bold" }}
                    >
                      {application.applicants.length}
                    </Typography>
                  </IconButton>
                ) : (
                  <PastelComponent
                    bgColor="#ffe0c8"
                    textColor="#03468f"
                    text={application.applicants.length + " Applicants"}
                    fontSize="medium"
                    style={{
                      marginLeft: "8px",
                      maxWidth: "150px",
                      fontWeight: "750",
                      "&:hover": {
                        backgroundColor: "#ffd0b0", // slightly darker on hover for a visual feedback
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleApplicants(application.proposal_id);
                    }}
                  />
                )
              }
              sx={{
                alignItems: "center",
                alignContent: "center",
                verticalAlign: "middle",
              }}
            />
            {/** COLORE NO APPLICANTS -> #ffe0c8 */}

            <CardContent>
              <Collapse in={showApplicants[application.proposal_id]}>
                <TableContainer>
                  <Table>
                    {renderTableHead()}
                    {renderTableRows(application.applicants)}
                  </Table>
                </TableContainer>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

function PastelComponent({
  bgColor,
  textColor,
  text,
  fontSize,
  onClick,
  style,
}) {
  // if onClick is not passed, then onClick is null and the component returned is a Paper component with all the props passed to it (bgColor, textColor, text, fontSize)
  // if onClick is passed, then onClick is a function and the component returned is a button with all the props passed to it (bgColor, textColor, text, fontSize, onClick as a function to onClick of the button)

  const stylePastel = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: fontSize,
    borderRadius: "18px",
    width: "100%",
    height: "100%",
    padding: "6px 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    ...style,
  };

  return onClick ? (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        ...stylePastel,
        "&:hover": {
          backgroundColor: bgColor,
          color: textColor,
        },
        ...style,
      }}
    >
      {text}
    </Button>
  ) : (
    <Paper
      elevation={0}
      sx={{
        ...stylePastel,
        ...style,
      }}
    >
      {text}
    </Paper>
  );
}

const students = [
  {
    id: 1,
    surname: "Rossi",
    name: "Mario",
    gender: "Male",
    nationality: "Italian",
    email: "mario.rossi@email.com",
    degree: "Computer Science",
    enrollmentYear: 2020,
  },
  {
    id: 2,
    surname: "Bianchi",
    name: "Luca",
    gender: "Male",
    nationality: "Italian",
    email: "luca.bianchi@email.com",
    degree: "Electrical Engineering",
    enrollmentYear: 2021,
  },
  {
    id: 3,
    surname: "Verdi",
    name: "Sofia",
    gender: "Female",
    nationality: "Italian",
    email: "sofia.verdi@email.com",
    degree: "Mechanical Engineering",
    enrollmentYear: 2019,
  },
  // ... more students
];
const proposals = [
  {
    id: "a1b2c3",
    title: "Artificial Intelligence in Robotics",
    supervisor: "Prof. Gianni",
    coSupervisors: "Prof. Marta, Prof. Carlo",
    keywords: "AI, Robotics",
    type: "Research",
    groups: "G1, G2",
    description: "Exploring AI applications in autonomous robots.",
    requiredKnowledge: "Basics of AI, Machine Learning",
    notes: "Focus on practical implementations",
    expiration: "2023-12-31",
    level: "MSc",
    cds: "Computer Science",
  },
  {
    id: "d4e5f6",
    title: "Renewable Energy Systems",
    supervisor: "Prof. Elena",
    coSupervisors: "",
    keywords: "Renewable Energy, Sustainability",
    type: "Development",
    groups: "G3",
    description: "Designing sustainable energy solutions.",
    requiredKnowledge: "Fundamentals of Renewable Energy",
    notes: "",
    expiration: "2023-06-30",
    level: "BSc",
    cds: "Electrical Engineering",
  },
  // ... more proposals
];

const applications = [
  { id: "x123", student_id: 1, proposal_id: "a1b2c3", status: "pending" },
  { id: "y456", student_id: 2, proposal_id: "a1b2c3", status: "accepted" },
  { id: "z789", student_id: 3, proposal_id: "d4e5f6", status: "declined" },
  // ... more applications
];

let groupedByProposalArray = [];
let groupedByStudentArray = [];

const combinedListTmp = applications.map((application) => {
  const student = students.find((s) => s.id === application.student_id);
  const proposal = proposals.find((p) => p.id === application.proposal_id);

  return {
    application_id: application.id,
    student_id: application.student_id,
    student_name: student ? `${student.name} ${student.surname}` : "Unknown",
    student_email: student ? student.email : "Unknown",
    student_degree: student ? student.degree : "Unknown",
    proposal_id: application.proposal_id,
    proposal_title: proposal ? proposal.title : "Unknown",
    status_application_student: application.status,
  };
});

const groupedByProposal = combinedListTmp.reduce((acc, item) => {
  if (!acc[item.proposal_id]) {
    acc[item.proposal_id] = {
      proposal_id: item.proposal_id,
      proposal_title: item.proposal_title,
      applicants: [],
    };
  }

  acc[item.proposal_id].applicants.push({
    student_id: item.student_id,
    student_name: item.student_name,
    student_email: item.student_email,
    student_degree: item.student_degree,
    status_application_student: item.status_application_student,
  });

  return acc;
}, {});

groupedByProposalArray = Object.values(groupedByProposal);

const groupedByStudent = combinedListTmp.reduce((acc, item) => {
  if (!acc[item.student_id]) {
    acc[item.student_id] = {
      student_id: item.student_id,
      student_name: item.student_name,
      applications: [],
    };
  }

  acc[item.student_id].applications.push({
    proposal_id: item.proposal_id,
    proposal_title: item.proposal_title,
    status: item.status_application_student,
  });

  return acc;
}, {});

groupedByStudentArray = Object.values(groupedByStudent);
