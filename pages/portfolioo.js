import Portfolio from '../src/components/Portfolio';
import { PDFViewer } from '@react-pdf/renderer';
import { Box } from '@mui/material';

export default function PortfolioPage() {
	return (
		<Box suppressHydrationWarning={true} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
			{ process.browser && (
					<PDFViewer style={{ width: '100vw', height: '100vh' }}>
						<Portfolio />
					</PDFViewer>
				)
			}
		</Box>
	);
};
