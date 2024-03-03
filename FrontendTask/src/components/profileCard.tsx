import * as React from "react"
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface CardProps {
  title: string;
  description: string;
  image: string;
  location: string;
}

const ProfileCard: React.FC<CardProps> = ({ title, description, image, location }) => {
  return (
    <Card sx={{ height: "70vh" }}>
      <CardMedia
        component="img"
        height="60%"
        image={image}
        alt={title}
        sx={{ objectFit: 'contain' }}
        style={{ backgroundColor: "grey" }}
      />
      <CardContent style={{ textAlign: "center", marginTop: "5vh" }}>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Typography gutterBottom variant="h2" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;