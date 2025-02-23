import { TableProps } from "antd";

export type ItemFiltersDTO = {
    page: number,
    pagesize: number,
    filtercategoryone?: string[],
    rankingtype?: string,
    categoryone?: string[],
    categorytwo?: string[],
    categorythree?: string[],
}

export type ItemUpdateDTO = {
    item_id: string,
    category_one_id: string | null,
    category_two_id: string | null,
    category_three_id: string | null,
}

export interface CategoryType {
    id: string;
    name: string;
    parent_id: null | string;
}

export type ItemDetailLinkOneType = {
    average: number,
    link: string,
    link_count: number,
    sum: number,
}

export type ItemDetailLinkTwoType = {
    main_link: string,
    sub_link_average: number,
    sub_links: string[]
    total_sub_links: number
}

export type ItemType = {
    key?: string;
    name: string;
    category_one_id: string | null;
    category_two_id: string | null;
    category_three_id: string | null;
    id: string;
    url: string;
    rank: number;
    ranking_type: "quality" | "quantity";
    graph_one: {
        [key: string]: {
            [key: string]: {
                type_one: number,
                type_two: number,
                unknown: number
            }
        }
    } | null;
    stats: {
        stats_five: number,
        stats_four: number,
        stats_one: number,
        stats_six: number,
        stats_seven: number,
        stats_three: number,
        stats_two: number
    },
    item_links_one: ItemDetailLinkOneType[],
    item_links_two: ItemDetailLinkTwoType[]
}


export type ItemDetailProps = {
    show: boolean;
    item: ItemType | null;
    onClose: () => void;
};

export type ItemResponseDTO = {
    total: number,
    data: ItemType[],
}

export type ItemRequestDTO = {
    page: number,
    pagesize: number,
    filtercategoryone?: string,
    rankingtype?: string,
    categoryone?: string,
    categorytwo?: string,
    categorythree?: string,
}

export type ItemRequestWithoutPagination = Omit<ItemFiltersDTO, "page" | "pagesize">;


export type TableRowSelection<T> = TableProps<T>["rowSelection"];