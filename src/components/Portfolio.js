import { Document, Page, View, Text, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from 'react';
import axios from 'axios';

Font.register(
	{
		family: 'Playfair', src: 'fonts/Playfair_Display/static/PlayfairDisplay-Regular.ttf'
	},
	{
		family: 'Playfair_Italic', src: 'fonts/Playfair_Display/static/PlayfairDisplay-Italic.ttf'
	});

export default function Portfolio({ name, email, phoneNum, courses, jobs }) {
	const styles = StyleSheet.create({
		page: {
			flexDirection: 'column',
			backgroundColor: '#FFFFFF'
		},
		section: {
			marginTop: 5,
			flexGrow: 1
		},
		topBanner: {
			padding: 2,
			flexGrow: 1,
			display: 'flex',
			justifyItems: 'center',
			alignItems: 'center'
		},
		topBannerName: {
			fontFamily: 'Playfair',
			fontSize: 40,
			textAlign: 'center'
		},
		topBannerData: {
			fontSize: 10,
			textAlign: 'center'
		},
		topBannerIcons: {
			width: 10,
			height: 10
		},
		topBannerDetails: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: 2
		},
		sectionTitle: {
			fontFamily: 'Playfair',
			fontSize: 20,
			textDecoration: 'underline'
		},
		objectiveTitle: {
			fontfamily: 'Playfair',
			fontSize: 10
		},
		objectiveStatement: {
			fontSize: 12,
			marginTop: 5,
			textAlign: 'center',
			fontfamily: 'Playfair_Italic',
		},
		objectiveDetails: {
			display: 'flex',
			flexDirection: 'column'
		},
		global: {
			margin: 10,
			padding: 10
		}
	});
	const [certifiedCourses, setCertifiedCourses] = useState([]);
	const [employments, setEmployments] = useState([]);

	const getCoursesEnrolledIn = async () => {
		const URL = 'http://0f07-125-209-114-66.ngrok.io/api';
		const res = await axios.get(`${URL}/courses/enrolled/${localStorage.getItem('username')}`, {
			header: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});

		setCertifiedCourses(res.data.filter((r) => r.status === 'CERTIFIED'));
	};

	const getJobsAppliedFor = async () => {
		const URL = 'http://0f07-125-209-114-66.ngrok.io/api';
		const res = await axios.get(`${URL}/jobs/applied/${localStorage.getItem('username')}`, {
			header: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});

		setEmployments(res.data.filter((r) => ['CURRENTLY_WORKING', 'QUITTED'].includes(r.status)));
	};

	useEffect(() => {
		getCoursesEnrolledIn();
		getJobsAppliedFor();
	}, []);

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.global}>
					<View style={styles.topBanner}>
						<Text style={styles.topBannerName}>Shaheer Ahmed</Text>
						<View style={styles.topBannerDetails}>
							<Image src='/images/call.png' alt="call" style={styles.topBannerIcons} />
							<Text style={styles.topBannerData}>
								{ ' ' }
							</Text>
							<Text style={styles.topBannerData}>
							{ '+92 332 3351824' }
							</Text>
							<Text style={styles.topBannerData}>
								{ ' | ' }
							</Text>
							<Image src='/images/location.png' alt="call" style={styles.topBannerIcons} />
							<Text style={styles.topBannerData}>
								{ ' ' }
							</Text>
							<Text style={styles.topBannerData}>
								{ 'Gulshan-e-Iqbal, Block 13-A' }
							</Text>
						</View>
					</View>
					<View>
						<Text style={styles.sectionTitle}>Career Objective</Text>
						<Text style={styles.objectiveStatement}>
							{ '"An enthusiastic learner looking for a team-oriented and growth-focused work environment."' }
						</Text>						
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Experience</Text>
						{ employments && employments.map((e, i) => (
							<View key={i}>
								<Text style={styles.bullet}>{e.Job.name}</Text>
								<Text style={styles.bulletDesc}>{e.Job.desc}</Text>
							</View>
						)) }
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Skills</Text>
						{ certifiedCourses && certifiedCourses.map((c, i) => (
								<View key={i}>
									<Text style={styles.bullet}>{c.Course.name}</Text>
									<Text style={styles.bulletDesc}>{c.Course.desc}</Text>
								</View>						
						)) }
					</View>
				</View>
			</Page>
		</Document>
	);
};
