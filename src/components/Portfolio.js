import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

export default function Portfolio({ name, email, phoneNum, courses, jobs }) {
	const styles = StyleSheet.create({
		page: {
			flexDirection: 'row',
			backgroundColor: '#E4E4E4'
		},
		section: {
			margin: 10,
			padding: 10,
			flexGrow: 1
		}
	});

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text>Experience</Text>
				</View>
				<View style={styles.section}>
					<Text>Skills</Text>
				</View>
			</Page>
		</Document>
	);
};
