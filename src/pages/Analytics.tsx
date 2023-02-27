import Header from '../../components/dashboard/Header';

function Analytics() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [teamData, setTeamData] = useState<Team[]>(teamArr);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    const filtered = teamArr.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setTeamData(filtered);
  };

  const openMemberDetails = (item: Team) => {
    navigate(`/dashboard/team/${item.id}`, { state: item });
  };

  return (
    <>
      <Header title="Team" />

  
    </>
  );
}

export default Analytics;
