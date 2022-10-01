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

const headers = new Headers({
  Authorization:
    "Bearer tfp_FeYuSVCDaieJgKi2qeauL1tavD6LGDLS8tbstJWV2UqP_3pc49HaFrQxNeu",
  "Content-Type": "application/json",
});

export async function getServerSideProps(context: any) {
  const response = await fetch(`https://api.typeform.com/forms`, {
    headers: headers,
  });

  const data: TypeFormForms | any = await response.json();

  return {
    props: {
      formsResponse: {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: data,
      },
    },
  };
}

type Props = {
  formsResponse: {
    ok: boolean;
    status: string;
    statusText: string;
    data: TypeFormForms | any;
  };
};

function Forms({ formsResponse: { ok, status, statusText, data } }: Props) {
  const handleNewForm = async () => {
    const response = await fetch(`/api/hello`);
    const data = await response.json();
    console.log({ data });
  };

  console.log({ ok });
  console.log({ status });
  console.log({ statusText });
  console.log({ data });

  if (ok) {
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
          {data.items.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>
                  <a
                    href={item._links.display}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <a
                    href={`https://admin.typeform.com/form/${item.id}/create`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Admin
                  </a>
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

  if (!ok) {
    return <p>An error has occured</p>;
  }
}

export default Forms;
