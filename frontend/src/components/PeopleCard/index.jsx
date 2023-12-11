import { peopleCardStyles } from "./styles.css";

function PeopleCard(props) {
    console.log(props)

    const currentPeople = {
        id: props.id,
        name: props.name,
        email: props.email,
        photoUrl: "/images/aluno.jpg",
    }

    return (
        <a href={`/admin/students/${currentPeople.id}`} key={currentPeople.id} className={peopleCardStyles.container} >
            <div className={peopleCardStyles.image}>
                <img className="rounded-2xl" src={currentPeople.photoUrl} alt="Foto do Aluno" />
            </div>

            <div className={peopleCardStyles.tittle}>
                {currentPeople.name}
            </div>

            <div className={peopleCardStyles.info}>
                <span className="font-semibold">{currentPeople.email}</span>
            </div>
        </a>
    );
}

export default PeopleCard;