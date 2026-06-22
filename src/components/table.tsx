import { DataGrid} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../api/labels-api';
import CustomToolbar from './custom-toolbar';
function LableTable() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['labelsData'],
    queryFn: getLabels
  })

  if (error) return 'An error has occurred: ' + error.message

  
  return (
    <div>
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
    />
    </div>
    
  );
}

export default LableTable;