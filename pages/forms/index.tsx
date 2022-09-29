type TypeFormFormsItem = {
  id: string;
  type: string;
  title: string;
  last_updated_at: string;
  created_at: string;
  _links: { display: string };
};

type TypeFormForms = {
  total_items: number;
  page_count: number;
  items: TypeFormFormsItem[];
};

export async function getServerSideProps(context: any) {
  const res = await fetch(`https://api.typeform.com/forms`, {
    headers: new Headers({
      Authorization:
        "Bearer tfp_5jvzNFWrLA7xSo7WApmznzDQ9gqZCdwtUCAnb6btwvc_eogd8UQAPZ5r",
      "Content-Type": "application/json",
    }),
  });
  const data: TypeFormForms = await res.json();

  return {
    props: {
      forms: data,
    },
  };
}

type Props = {
  forms: TypeFormForms;
};

function Forms({ forms }: Props) {
  const handleNewForm = () => {};

  return (
    <div>
      <h1>Forms (mes parcours dinscription)</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Title</th>
          <th>Link</th>
          <th>Last Updated At</th>
        </tr>
        {forms.items.map((item, key) => {
          return (
            <tr key={key}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>
                <a href={item._links.display} target="_blank" rel="noreferrer">Link</a>
              </td>
              <td>{item.last_updated_at}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={handleNewForm}>New form</button>
    </div>
  );
}

export default Forms;
