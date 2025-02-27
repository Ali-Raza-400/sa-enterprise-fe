import React from "react";
import { Empty, Table } from "antd";
import type { TableProps } from "antd";



interface GenericTableProps<T> {
	columns: TableProps<T>["columns"];
	data: any;
	tableProps?: TableProps<T>;
	enablePagination?: boolean;
	updatePaginationFunc?: (pagination: {
		page: number;
		pageSize: number;
	}) => void;
	loading?: boolean;
	selectionType?: "checkbox" | "radio";
	selectedRowKeys?: React.Key[];
	onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
	rowKey?: string | ((record: T) => React.Key);
	enableSelection?: boolean;
	showScroll?:boolean
}

const GenericTable = <T extends object>({
	columns,
	data,
	tableProps,
	enablePagination = true,
	updatePaginationFunc,
	loading,
	selectionType = "radio",
	enableSelection = false,
	selectedRowKeys,
	onSelectionChange,
	rowKey = "id",
	showScroll=false
}: GenericTableProps<T>) => {
	const paginationData = !Array.isArray(data) ? data?.pagination?.metadata : undefined;
	const listData = Array.isArray(data) ? data : data?.list;

	const rowSelection: TableProps<T>["rowSelection"] = enableSelection
		? {
				type: selectionType,
				selectedRowKeys: selectedRowKeys,
				onChange: (selectedKeys: React.Key[], selectedRows: T[]) => {
					if (onSelectionChange) {
						onSelectionChange(selectedKeys, selectedRows);
					}
				},
				// getCheckboxProps: (record: any) => console.log(record, "REC"),
			}
		: undefined;

	const pagination: TableProps<T>["pagination"] =
		enablePagination && paginationData
			? {
					total: paginationData.totalRecords,
					defaultCurrent: paginationData.page || 1,
					defaultPageSize: paginationData.pageSize || 10,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} entries`,
					onChange: (page, pageSize) => {
						if (updatePaginationFunc) {
							updatePaginationFunc({
								page,
								pageSize,
							});
						}
					},
				}
			: false;
	return (
		<Table
			columns={columns}
			dataSource={listData}
			{...tableProps}
			className="generic-table"
			loading={loading}
			rowKey={rowKey}
			locale={{
				emptyText: <Empty />,
			}}
			pagination={pagination}
			rowSelection={rowSelection}
			scroll={showScroll ? { y: 400 } : undefined}
		/>
	);
};

export default GenericTable;
