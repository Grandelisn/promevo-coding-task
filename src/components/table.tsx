import { DataGrid } from '@mui/x-data-grid';
import { useLabelContext } from '../contexts/label-context';

function LableTable() {
  const { labels } = useLabelContext();
  return (
    <DataGrid
      rows={labels}
      columns={[
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'messagesTotal', headerName: 'Messages', width: 200 },
        { field: 'threadsTotal', headerName: 'Threads', width: 200 },
      ]}
      initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
    />
  );
}

export default LableTable;