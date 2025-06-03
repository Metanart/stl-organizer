import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

type PathItem = {
    id: number;
    path: string;
};

export const PathsPage = () => {
    const [paths, setPaths] = useState<PathItem[]>([]);
    const [newPath, setNewPath] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPaths = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/paths');
            const data = await res.json();
            setPaths(data);
        } catch (err) {
            console.error('Failed to fetch paths:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaths();
    }, []);

    const addPath = async () => {
        const trimmed = newPath.trim();
        if (!trimmed) return;

        // prevent duplicates on client side
        if (paths.some((p) => p.path === trimmed)) return;

        try {
            const res = await fetch('/api/paths', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: trimmed }),
            });

            if (!res.ok) throw new Error('Failed to add path');
            const created: PathItem = await res.json();

            setPaths((prev) => [...prev, created]);
            setNewPath('');
        } catch (err) {
            console.error(err);
        }
    };

    const removePath = async (id: number) => {
        try {
            const res = await fetch(`/api/paths/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete path');

            setPaths((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
            <Typography variant='h4' gutterBottom>
                📁 Model Folder Paths
            </Typography>

            <Stack direction='row' spacing={2} mb={3}>
                <TextField
                    fullWidth
                    label='Enter path to folder'
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
                />
                <Button variant='contained' onClick={addPath}>
                    Add
                </Button>
            </Stack>

            {loading ? (
                <Typography color='text.secondary'>Loading...</Typography>
            ) : paths.length === 0 ? (
                <Typography color='text.secondary'>
                    No paths added yet.
                </Typography>
            ) : (
                <List dense>
                    {paths.map(({ id, path }) => (
                        <ListItem
                            key={id}
                            secondaryAction={
                                <IconButton
                                    edge='end'
                                    onClick={() => removePath(id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <Box sx={{ mb: 1, mt: 1, width: '100%' }}>
                                <Paper sx={{ padding: 1, width: '100%' }}>
                                    <ListItemText primary={path} />
                                </Paper>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};
