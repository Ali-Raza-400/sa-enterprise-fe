import { ItemRequestDTO, ItemType, ItemUpdateDTO } from "../../pages/ItemDashboard/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const itemApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<any, ItemRequestDTO>({
      query: (params) => {
        return ({
          url: API_PATHS.ITEMS,
          method: "GET",
          params: params,
        })
      },
      providesTags: (result) => providesList(result?.data, RTK_TAGS.ITEMS),
    }),
    updateItem: builder.mutation<any, { updatePayload: ItemUpdateDTO, listPayload?: ItemRequestDTO }>({
      query: ({ updatePayload }) => ({
        url: API_PATHS.ITEMS,
        method: "PUT",
        data: updatePayload,
      }),
      async onQueryStarted({ updatePayload, listPayload }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (listPayload) {
            dispatch(
              itemApi.util.updateQueryData("getItems", listPayload, (draft) => {
                const item = draft.data.find(
                  (item: ItemType) => item.id === updatePayload.item_id
                );
                item.category_one_id = updatePayload.category_one_id;
                item.category_two_id = updatePayload.category_two_id;
                item.category_three_id = updatePayload.category_three_id;
              })
            );
          }
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    getItem: builder.query<any, string>({
      query: (id) => ({
        url: `${API_PATHS.ITEMS}/${id}`,
        method: "GET",
      }),
    }),
  })

});

export const {
  useLazyGetItemsQuery,
  useUpdateItemMutation,
  useLazyGetItemQuery
} = itemApi;
