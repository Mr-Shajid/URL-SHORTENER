import * as React from 'react';
import type { UrlData } from '../../interface/UrlData';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../helpers/Constants';
import axios from 'axios';

interface IDataTableProps {
    data: UrlData[];
    updateReloadState: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
    const {data, updateReloadState} = props;
    console.log("Data in Datatable is: ", data)
    const renderTableData = () => {
        return data.map((item) => {
            return (
                <tr key = {item._id} className='border-b text-white bg-gray-600 hover:bg-white hover:text-gray-800'>
                    <td className='px-6 py-3 break-words'>
                        <Link to ={item.fullUrl} target='blank' rel="noreferrer noopener">{item.fullUrl}</Link>
                    </td>
                    <td className='px-6 py-3 break-words'>
                        <Link to ={`${serverUrl}/shortUrl/${item.shortUrl}`} target='blank' rel="noreferrer noopener">{item.shortUrl}</Link>
                    </td>
                    <td className='px-12'>{item.clicks}</td>
                    <td className='px-10'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1 mb-2 text-green-600" onClick={() => copyToClipboard(item.shortUrl)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-1 text-red-500" onClick={() => deleteUrl(item._id)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

</td>
                </tr>
            )
        })
    };


    const copyToClipboard = async (url:string) => {
        try {
            await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
            alert(`URL copied: ${serverUrl}/shortUrl/${url}`)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUrl = async (id:string) => {
        const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
        console.log(response);
        updateReloadState();
    };


  return (
    <div className='container mx-auto pt-2 pb-10'>
        <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
            <table className='w-full table-fixed text-sm text-left rtl:text-right text-gray-500'>
                <thead className='text-md uppercase text-gray-50 bg-gray-700'>
                    <tr>
                        <th scope='col' className='px-6 py-3 w-6/12'>FullUrl</th>
                    
                        <th scope='col' className='px-6 py-3 w-3/12'>ShortUrl</th>
                
                        <th scope='col' className='px-6 py-3'>Clicks</th>
                
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default DataTable;
