// Imports
import { Button, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack } from "@mui/material";

interface ProjectPageType extends DialogProps {
    open: boolean
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
    onCloseCallback?: () => void;
}
export const ProjectPage: React.FC<ProjectPageType> = ({
    open,
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
    onCloseCallback = () => { },
    ...props
}) => {
    return (
        <Dialog
            sx={{ zIndex: 5 }}
            fullWidth
            maxWidth={"lg"}
            open={open}
            onClose={onCloseCallback}
            scroll={"paper"}
            {...props}
        >
            <DialogTitle >
                {title}
                <Stack direction={"row"} gap={2} justifyContent={"space-between"} marginBottom={1.5}>
                    {tags.map((tag, index) => (
                        <Chip key={index} sx={{ background: tag.color, color: "white" }} label={tag.name} />
                    ))}
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <CardMedia component="img" image={img} alt={alt} />
                <DialogContentText>
                    {content}
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        {notionLink && <Button onClick={() => window.open(notionLink, "_blank")} autoFocus>
                            Acessar link do projeto no notion
                        </Button>}
                        {linkApi && <Button onClick={() => window.open(linkApi, "_blank")} autoFocus>
                            Acessar link da api do projeto
                        </Button>}
                        {linkApp && <Button onClick={() => window.open(linkApp, "_blank")} autoFocus>
                            Acessar link do app do projeto
                        </Button>}
                        {projectLink && <Button onClick={() => window.open(projectLink, "_blank")} autoFocus>
                            Acessar link do projeto publicado
                        </Button>}
                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseCallback} autoFocus>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog >
    );
};

ProjectPage;
