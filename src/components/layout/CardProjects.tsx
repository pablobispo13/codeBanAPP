// Imports
import { useState } from "react";
import { CardActionArea, Chip, Stack } from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Components
import { ProjectPage } from "./ProjectPage";

// Types
interface CardProjectsType extends CardProps {
  title?: string;
  content?: string;
  img?: string;
  alt?: string;
  tags?: { name: string, color: string }[];
  expandImage?: boolean
  linkApi?: string
  linkApp?: string
  notionLink?: string
  projectLink?: string
  onClickAction?: () => void;
}

export const CardProjects: React.FC<CardProjectsType> = ({
  title,
  content,
  img,
  alt,
  expandImage = false,
  linkApi,
  linkApp,
  notionLink,
  projectLink,
  tags = [],
  onClickAction = () => { },
  ...props
}) => {

  const [openProjectPage, setOpenProjectPage] = useState(false);

  return (<>
    <Card sx={{ minWidth: 350 }} {...props}>
      <CardActionArea onClick={() => { setOpenProjectPage(true) }}>
        <CardMedia component="img" sx={{ maxHeight: "300px" }} image={img} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Stack direction={"row"} gap={2} justifyContent={"space-between"} marginBottom={1.5}>
              {tags.map((tag, index) => (
                <Chip key={index} sx={{ background: tag.color, color:"white" }} label={tag.name} />
              ))}
            </Stack>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <ProjectPage
      open={openProjectPage}
      onCloseCallback={() => setOpenProjectPage(false)}
      title={title}
      content={content}
      img={img}
      alt={alt}
      expandImage={expandImage}
      linkApi={linkApi}
      linkApp={linkApp}
      notionLink={notionLink}
      projectLink={projectLink}
      tags={tags}
    />
  </>
  );
};
