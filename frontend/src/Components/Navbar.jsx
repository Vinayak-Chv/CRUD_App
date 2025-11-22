import Searchbar from "./Searchbar"

const Navbar = ({ onAdd, onSearch, onFilter }) => {
  return (
    <div className="flex justify-around items-center m-4">
        <div>
            <h1 className="text-[#EFECE3] text-2xl font-bold cursor-pointer">Clients Data</h1>
        </div>

        <div>
            <Searchbar onSearch={onSearch} onFilter={onFilter} />
        </div>

        <div>
            <button className="px-4 py-2 font-semibold cursor-pointer bg-[#8FABD4] rounded-md text-[#000000] transition-all duration-300 hover:bg-[#4A70A9] hover:text-[#EFECE3] hover:scale-110" onClick={onAdd}>Add Data</button>
        </div>
    </div>
  )
}

export default Navbar