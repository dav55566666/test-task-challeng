const filterButton = document.getElementById('filtr-btn');
const filterMenu = document.getElementById('filtr-menu');
const closeFilterBtn = document.getElementById('close-filtr-btn');

filterButton && filterMenu && filterButton.addEventListener('click', () => {
    filterMenu.classList.add('active');
});

closeFilterBtn && closeFilterBtn.addEventListener('click', () => {
    filterMenu.classList.remove('active');
});

const coursesData = [
    {
        id: 1,
        img: "teacher.png",
        tag: "Marketing",
        tagBg: "green",
        title: "The Ultimate Google Ads Training Course",
        price: "$100",
        teacherName: "by Jerome Bell",
        category: "marketing"
    },
    {
        id: 2,
        img: "teacher2.png",
        tag: "Management",
        tagBg: "blue",
        title: "Prduct Management Fundamentals",
        price: "$480",
        teacherName: "by Marvin McKinney",
        category: "managment"
    },
    {
        id: 3,
        img: "teacher3.png",
        tag: "HR & Recruting",
        tagBg: "orange",
        title: "HR Management and Analytics",
        price: "$200",
        teacherName: "by Leslie Alexander Li",
        category: "htRecruting"
    },
    {
        id: 4,
        img: "teacher4.png",
        tag: "Marketing",
        tagBg: "green",
        title: "Brand Management & PR Communications",
        price: "$530",
        teacherName: "by Kristin Watson",
        category: "marketing"
    },
    {
        id: 5,
        img: "teacher5.png",
        tag: "Design",
        tagBg: "pink",
        title: "Graphic Design Basic",
        price: "$500",
        teacherName: "by Guy Hawkins",
        category: "desing"
    },
    {
        id: 6,
        img: "teacher6.png",
        tag: "Management",
        tagBg: "blue",
        title: "Business Development Management",
        price: "$400",
        teacherName: "by Dianne Russell",
        category: "managment"
    },
    {
        id: 7,
        img: "teacher7.png",
        tag: "Development",
        tagBg: "purple",
        title: "Highload Software Architecture",
        price: "$600",
        teacherName: "by Brooklyn Simmons",
        category: "development"
    },
    {
        id: 8,
        img: "teacher8.png",
        tag: "HR & Recruting",
        tagBg: "orange",
        title: "Human Resources – Selection and Recruitment",
        price: "$150",
        teacherName: "by Kathryn Murphy",
        category: "htRecruting"
    },
    {
        id: 9,
        img: "teacher9.png",
        tag: "Desing",
        tagBg: "pink",
        title: "User Experience. Human-centered Design",
        price: "$240",
        teacherName: "by Cody Fisher",
        category: "userExperience"
    },
    {
        id: 10,
        img: "teacher.png",
        tag: "Marketing",
        tagBg: "green",
        title: "The Ultimate Google Ads Training Course",
        price: "$100",
        teacherName: "by Jerome Bell",
        category: "marketing"
    },
    {
        id: 11,
        img: "teacher2.png",
        tag: "Management",
        tagBg: "blue",
        title: "Prduct Management Fundamentals",
        price: "$480",
        teacherName: "by Marvin McKinney",
        category: "managment"
    },
    {
        id: 12,
        img: "teacher3.png",
        tag: "HR & Recruting",
        tagBg: "orange",
        title: "HR Management and Analytics",
        price: "$200",
        teacherName: "by Leslie Alexander Li",
        category: "htRecruting"
    },
    {
        id: 13,
        img: "teacher4.png",
        tag: "Marketing",
        tagBg: "green",
        title: "Brand Management & PR Communications",
        price: "$530",
        teacherName: "by Kristin Watson",
        category: "marketing"
    },
    {
        id: 14,
        img: "teacher5.png",
        tag: "Design",
        tagBg: "pink",
        title: "Graphic Design Basic",
        price: "$500",
        teacherName: "by Guy Hawkins",
        category: "desing"
    },
    {
        id: 15,
        img: "teacher6.png",
        tag: "Management",
        tagBg: "blue",
        title: "Business Development Management",
        price: "$400",
        teacherName: "by Dianne Russell",
        category: "managment"
    },
    {
        id: 16,
        img: "teacher7.png",
        tag: "Development",
        tagBg: "purple",
        title: "Highload Software Architecture",
        price: "$600",
        teacherName: "by Brooklyn Simmons",
        category: "development"
    },
    {
        id: 17,
        img: "teacher8.png",
        tag: "HR & Recruting",
        tagBg: "orange",
        title: "Human Resources – Selection and Recruitment",
        price: "$150",
        teacherName: "by Kathryn Murphy",
        category: "htRecruting"
    },
    {
        id: 18,
        img: "teacher9.png",
        tag: "Desing",
        tagBg: "pink",
        title: "User Experience. Human-centered Design",
        price: "$240",
        teacherName: "by Cody Fisher",
        category: "userExperience"
    }
];

const teacherList = document.getElementById('teachers-list');

const TecherItem = ({ img, tagBg, tag, title, price, teacherName }) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('teacher-item');
    wrapper.innerHTML = `
        <div class="teacher-item__img">
            <img src="/img/${img}" alt="">
        </div>
        <div class="teacher-item__content">
            <span class="tag bg-${tagBg}">${tag}</span>
            <h4><a href="#">${title}</a></h4>
            <div class="teacher-item__price">
                <span class="price">${price}</span>
                <span class="teacher-name">${teacherName}</span>
            </div>
        </div>
    `;
    return wrapper;
};

const renderTeachers = ({
    limit = 9,
    category = 'all',
    search = ''
}) => {
    teacherList.innerHTML = '';

    let filtered = coursesData;

    if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
    }

    if (search.trim() !== '') {
        const q = search.toLowerCase();
        filtered = filtered.filter(item => item.title.toLowerCase().includes(q));
    }

    filtered.slice(0, limit).forEach(course => {
        const { img, tagBg, tag, title, price, teacherName } = course;
        teacherList.appendChild(
            TecherItem({ img, tagBg, tag, title, price, teacherName })
        );
    });
};

let limit = 9;
let category = 'all';

renderTeachers({ limit, category });

const loadMoreBtn = document.getElementById('load-more-btn');
loadMoreBtn.addEventListener('click', () => {
    renderTeachers({
        limit: 100,
        category
    });
    loadMoreBtn.style.display = 'none';
});

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    const categoryName = button.getAttribute('data-value');

    const countElement = button.querySelector('.count');

    if (countElement) {
        countElement.textContent = coursesData.filter(
            course => course.category === categoryName || categoryName === 'all'
        ).length;
    }

    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        category = categoryName
        renderTeachers({
            limit,
            category: categoryName
        });
    });
});

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
    const { value } = e.target;
    renderTeachers({
        limit,
        category,
        search: value
    });
})