import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../api/get-labels';
import CustomToolbar from './custom-toolbar';
import AddLabelForm from './label-form';
import { useLabelContext } from '../contexts/label-context';
import { Modal, Box } from '@mui/material';
import type { GmailLabel } from '../types/gmail-label';
import { useNavigate } from 'react-router';

function LableTable() {
	const { showLabelForm, setShowLabelForm, setSelectedRow } = useLabelContext();
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['labelsData'],
		queryFn: getLabels,
	});
	const navigate = useNavigate();

	function handleClose() {
		setShowLabelForm(null);
	}

	if (error) {
		return <p>An error has occurred: {error.message}</p>;
	}

	return (
		<div>
			{isFetching ? (
				<p>Loading</p>
			) : (
				<DataGrid
					rows={data?.labels}
					columns={[
						{ field: 'name', headerName: 'Name', width: 200 },
						{ field: 'type', headerName: 'Type', width: 200 },
						{ field: 'id', headerName: 'ID', width: 200 },
					]}
					loading={isPending}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					slots={{ toolbar: CustomToolbar }}
					showToolbar
					checkboxSelection
					disableMultipleRowSelection
					onRowSelectionModelChange={(newRowSelectionModel) => {
						const selectedRowIds = [...newRowSelectionModel.ids];
						const selectedLabel = data?.labels.find(
							(label: GmailLabel) => label.id === selectedRowIds[0]
						);
						if (!selectedLabel) return;
						setSelectedRow(selectedLabel);
						navigate(`/label/${selectedLabel?.id}`);
					}}
				/>
			)}
			<Modal
				open={!!showLabelForm}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 shadow-xl">
					<AddLabelForm />
				</Box>
			</Modal>
		</div>
	);
}

export default LableTable;
