import { useEffect, useState } from "react";
import type { Design } from "@canva/connect-api-ts/types.gen";
import { useAppContext } from "src/context/app-context";
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Container,
  Modal,
  Box 
} from "@mui/material";
import { Download } from "@mui/icons-material";

export default function Designs() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { services, addAlert } = useAppContext();
  const [isExporting, setIsExporting] = useState<Record<string, boolean>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const fetchedDesigns = await services.designs.getDesigns();
        setDesigns(fetchedDesigns);
      } catch (error) {
        addAlert({
          title: "Error fetching designs",
          body: error instanceof Error ? error.message : "Unknown error",
          variant: "error",
        });
        console.error("Error fetching designs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesigns();
  }, [services.designs, addAlert]);

  const handleExport = async (designId: string) => {
    setIsExporting(prev => ({ ...prev, [designId]: true }));
    try {
      const exportResponse = await services.exports.exportDesign({ designId });
      if (exportResponse.job.status === 'success' && exportResponse.job.urls) {
        setPreviewUrl(exportResponse.job.urls[0]);
      } else {
        throw new Error('Export failed or URL not available');
      }
    } catch (error) {
      addAlert({
        title: "Error exporting design",
        body: error instanceof Error ? error.message : "Unknown error",
        variant: "error",
      });
    } finally {
      setIsExporting(prev => ({ ...prev, [designId]: false }));
    }
  };

  const handleCloseModal = () => {
    setPreviewUrl(null);
  };

  if (isLoading) {
    return <Typography variant="h6">Loading designs...</Typography>;
  }

  if (designs.length === 0) {
    return <Typography variant="h6">No designs found.</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        My Designs
      </Typography>
      <Grid container spacing={3}>
        {designs.map((design) => (
          <Grid item key={design.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {design.thumbnail && (
                <CardMedia
                  component="img"
                  sx={{
                    aspectRatio: '1/1',
                    objectFit: 'cover'
                  }}
                  image={design.thumbnail.url}
                  alt={design.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  noWrap
                  title={design.title}
                >
                  {design.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last modified: {new Date(design.updated_at * 1000).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => handleExport(design.id)}
                  disabled={isExporting[design.id]}
                >
                  {isExporting[design.id] ? 'Exporting...' : 'Export'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={!!previewUrl}
        onClose={handleCloseModal}
        aria-labelledby="export-preview"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Export preview"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
}
