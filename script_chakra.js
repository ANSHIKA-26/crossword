class Wheel {
    constructor(ctx, radius, center, sections, headings, subtexts) {
        this.ctx = ctx;
        this.radius = radius;
        this.center = center;
        this.sections = sections;
        this.headings = headings;
        this.subtexts = subtexts;
        this.hoveredIndex = null;

        // Event listener for mouse move
        canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - this.center.x;
        const mouseY = event.clientY - rect.top - this.center.y;
        const angle = Math.atan2(-mouseY, mouseX);
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

        if (distance <= this.radius) {
            const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
            const index = Math.floor(normalizedAngle / (2 * Math.PI / this.sections));
            this.hoveredIndex = index;
        } else {
            this.hoveredIndex = null;
        }

        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);

        for (let index = 0; index < this.sections; index++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(
                Math.cos((2 * Math.PI / this.sections) * index) * this.radius,
                -Math.sin((2 * Math.PI / this.sections) * index) * this.radius
            );
            this.ctx.lineTo(
                Math.cos((2 * Math.PI / this.sections) * (index + 1)) * this.radius,
                -Math.sin((2 * Math.PI / this.sections) * (index + 1)) * this.radius
            );
            this.ctx.closePath();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            this.ctx.fill();
            this.ctx.strokeStyle = '#0505ab';
            this.ctx.lineWidth = 9;
            this.ctx.stroke();

            this.ctx.save();
            this.ctx.translate(
                Math.cos((2 * Math.PI / this.sections) * (index + 0.5)) * (this.radius * 0.7),
                -Math.sin((2 * Math.PI / this.sections) * (index + 0.5)) * (this.radius * 0.7)
            );
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#FFFFFF'; // White color for the text
            this.ctx.font = '15px Arial';
            this.ctx.fillText(`Part ${index + 1}`, 0, 0); // Displaying "Part 1", "Part 2", etc.
            this.ctx.restore();
        }

        if (this.hoveredIndex !== null) {
            this.showMessageBox(this.headings[this.hoveredIndex], this.subtexts[this.hoveredIndex], event);
        }

        this.ctx.restore();
    }

    showMessageBox(heading, subtext, event) {
        const messageBox = document.getElementById('message-box');
        messageBox.style.display = 'block';
        messageBox.innerHTML = `<strong>${heading}</strong><br><span>${subtext}</span>`;
        messageBox.style.left = `${event.clientX + 10}px`;
        messageBox.style.top = `${event.clientY + 10}px`;
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const headings = [
    "The Union and its Territory",
    "Citizenship",
    "Directive Principles of State Policy",
    "The Union",
    "The States",
    "The Union Territories",
    "The Panchayats",
    "The Municipalities",
    "The Scheduled and Tribal Areas",
    "Relations between the Union and the States",
    "Finance, Property, Contracts, and Suits",
    "Trade, Commerce, and Intercourse within the Territory of India",
    "Services under the Union and the States",
    "Tribunals",
    "Elections",
    "Special Provisions Relating to Certain Classes",
    "Official Language",
    "Emergency Provisions",
    "Miscellaneous",
    "Amendment of the Constitution",
    "Temporary Provisions for the States of Assam, Meghalaya, Manipur, and Tripura",
    "Continuance of the President’s Proclamation of Emergency",
    "The Constitution (Scheduled Tribes) Order, 1950",
    "Repeal of Certain Enactments"
];
const subtexts = [
    "Details the structure and functioning of the Union and its territories.",
    "Provisions related to citizenship of India.",
    "Guidelines for creating a social order characterized by social, economic, and political justice.",
    "Covers the Parliament and its operations.",
    "Describes the organization and functioning of state governments.",
    "Details about Union Territories and their administration.",
    "Describes the structure and function of Panchayats.",
    "Details the structure and function of Municipalities.",
    "Special provisions related to Scheduled and Tribal Areas.",
    "Relations between the Union and the States, including distribution of powers.",
    "Management of finance, property, and contracts at the Union and State levels.",
    "Regulates trade and commerce within Indian territory.",
    "Provisions about services under the Union and State governments.",
    "Covers the establishment and operation of tribunals.",
    "Describes the election process for Parliament and State legislatures.",
    "Special provisions related to certain classes of citizens.",
    "Provisions related to the official language of the Republic of India.",
    "Details about emergency provisions under specific conditions.",
    "Miscellaneous provisions of the Constitution.",
    "Provisions for amending the Constitution.",
    "Provisions for specific states.",
    "Provisions for continuance of the President’s proclamation of emergency.",
    "Covers Scheduled Tribes as per the Constitution Order of 1950.",
    "Provisions for repealing certain enactments."
];

const wheel = new Wheel(ctx, 300, { x: canvas.width / 2, y: canvas.height / 2 }, 24, headings, subtexts);
wheel.draw();

const centerButton = document.getElementById('center-button');
const messageBox = document.getElementById('message-box');

centerButton.addEventListener('mouseover', function (event) {
    messageBox.style.display = 'block';
    messageBox.innerHTML = `<strong>Fundamental Rights and Duties</strong><br><a href="https://nishi-0212.github.io/Institutions-and-Constitution/">Click here for more information</a>`;
    messageBox.style.left = `${event.clientX + 10}px`;
    messageBox.style.top = `${event.clientY + 10}px`;
});

centerButton.addEventListener('click', function () {
    window.location.href = 'https://nishi-0212.github.io/Institutions-and-Constitution/';
});

centerButton.addEventListener('mousemove', function (event) {
    messageBox.style.left = `${event.clientX + 10}px`;
    messageBox.style.top = `${event.clientY + 10}px`;
});

centerButton.addEventListener('mouseout', function () {
    messageBox.style.display = 'none';
});
