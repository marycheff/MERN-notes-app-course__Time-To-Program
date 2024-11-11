import NoteCard from "../../components/cards/NoteCard"
import Navbar from "../../components/navbar/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <NoteCard
                        title="Встреча 7го апреля"
                        date="Сегодня, 11:00"
                        content="Встреча в 7:00"
                        tags={["#Встреча"]}
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    />
                   
                </div>
            </div>
        </>
    )
}

export default Home
