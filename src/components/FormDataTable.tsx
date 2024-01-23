import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";

function ReactDataTables({ ...props }: Config) {
	const tableRef = useRef<HTMLTableElement>(null);

	useEffect(() => {
		const dt = new DataTables(tableRef.current!, props);
		return () => {
			dt.destroy();
		};
	}, [props.data]);

	return <table ref={tableRef}></table>;
}

export default ReactDataTables;
