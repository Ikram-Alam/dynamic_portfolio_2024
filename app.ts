// TypeScript code
document.getElementById('resume-form')?.addEventListener('submit', function (e: Event) {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const about = (document.getElementById('about') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const certificates = (document.getElementById('certificates') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const volunteer = (document.getElementById('volunteer') as HTMLTextAreaElement).value.replace(/,/g, '<br>');

    const profilePic = (document.getElementById('profile-pic') as HTMLInputElement).files?.[0];
    let profilePicUrl: string = '';

    if (profilePic) {
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        reader.onload = function (e: ProgressEvent<FileReader>) {
            profilePicUrl = e.target?.result as string;
            generateResume(profilePicUrl);
        };
    } else {
        generateResume();
    }

    function generateResume(profilePicUrl: string = ''): void {
        const resumeContent: string = `
            <div class="resume-header">
                ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture">` : ''}
                <div>
                    <h2>${name}</h2>
                    <p>${email} | ${phone}</p>
                </div>
            </div>
            <div class="resume-section">
                <h3>About</h3>
                <p>${about}</p>
            </div>
            <div class="resume-section">
                <h3>Education</h3>
                <p>${education}</p>
            </div>
            <div class="resume-section">
                <h3>Work Experience</h3>
                <p>${experience}</p>
            </div>
            <div class="resume-section">
                <h3>Skills</h3>
                <p>${skills}</p>
            </div>
            <div class="resume-section">
                <h3>Certificates</h3>
                <p>${certificates}</p>
            </div>
            <div class="resume-section">
                <h3>Volunteer Experience</h3>
                <p>${volunteer}</p>
            </div>
        `;

        const resumeContainer = document.getElementById('resume-container') as HTMLElement;
        const resumeContentElement = document.getElementById('resume-content') as HTMLElement;

        resumeContentElement.innerHTML = resumeContent;
        resumeContainer.style.display = 'block';
    }

    // Download resume as PDF (optional)
    document.getElementById('download-btn')?.addEventListener('click', function () {
        const resumeContent = document.getElementById('resume-container')?.innerHTML;
        if (resumeContent) {
            const blob = new Blob([resumeContent], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${name}-resume.pdf`;
            link.click();
        }
    });
});
