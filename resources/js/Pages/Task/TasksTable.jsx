import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({tasks, success, queryParams = null, hideProjectColumn = false})
{
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        const newQueryParams = { ...queryParams };
        if (value) {
            newQueryParams[name] = value;
        } else {
            delete newQueryParams[name];
        }
        console.log("Updated Query Params:", newQueryParams); // Debugging
        router.get(route("task.index"), newQueryParams);
    };   

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }; 

    const sortChanged = (name) => {
        const newQueryParams = { ...queryParams };
        if (name === newQueryParams.sort_field) {
            newQueryParams.sort_direction = newQueryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            newQueryParams.sort_field = name;
            newQueryParams.sort_direction = "asc";
        }
        console.log("Sorting Updated:", newQueryParams); // Debugging
        router.get(route("task.index"), newQueryParams);
    };  

    const deleteTask = (task) => {
        if (!window.confirm('Are you sure you want to delete the task?')) {
            return; // Only return if the user cancels the confirmation
        }
    
        router.delete(route('task.destroy', task.id));
    };

    return(
        <>
        {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
            {success}
        </div>)}
            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading 
                                                name="id"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}>

                                                ID
                                            </TableHeading>
                                            <th className="px-3 py-3">Image</th>

                                            {!hideProjectColumn && (
                                                <th className="px-3 py-3">Project Name</th>
                                            )}
                                            
                                            <TableHeading 
                                                name="name"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}>
                                                Name
                                            </TableHeading>

                                            <TableHeading 
                                                name="status"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}>
                                                Status
                                            </TableHeading>

                                            <TableHeading 
                                                name="created_at"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}>
                                                Created Date
                                            </TableHeading>
                                            <TableHeading 
                                                name="due_date"
                                                sort_field={queryParams.sort_field} 
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}>

                                                Due Date
                                            </TableHeading>
                                            <th className="px-3 py-3">Created By</th>
                                            <th className="px-3 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            {!hideProjectColumn && (
                                                <th className="px-3 py-3"></th>
                                            )}                                            
                                            <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full"
                                                value={queryParams.name || ""}
                                                placeholder="Task Name"
                                                onChange={e => searchFieldChanged('name', e.target.value)}  // ✅ Add this
                                                onBlur={e => searchFieldChanged('name', e.target.value)}  
                                                onKeyPress={e => onKeyPress('name', e)}  
                                            />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput 
                                                    className="w-full"
                                                    value={queryParams.status || ""} // ✅ Only pass the required value
                                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.data.map((task) => (
                                            
                                            <tr
                                                key={task.id} // Added key prop to avoid React warning
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-3 py-2">{task.id}</td>
                                                <td className="px-3 py-2">
                                                <img
                                                    src={task.image_path}
                                                    alt="Task Image"
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                </td>
                                                {!hideProjectColumn && (
                                                    <td className="px-3 py-2">{task.project.name}</td>
                                                )}                                                
                                                <td className="px-3 py-2 text-gray-100 hover:underline">
                                                    <Link href={route("task.show", task.id)}>
                                                        {task.name}
                                                    </Link>                                                    
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span 
                                                        className={`px-2 py-1 rounded text-nowrap text-white ${TASK_STATUS_CLASS_MAP[task.status] || "bg-gray-500"}`}
                                                    >
                                                        {TASK_STATUS_TEXT_MAP[task.status] || "Unknown"}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {task.createdAt}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {task.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route("task.edit", task.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={ (e) => deleteTask(task)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={tasks.meta.links} />
        </>
    )
}