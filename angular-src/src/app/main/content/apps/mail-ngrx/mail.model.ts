export class Mail
{
    id: string;
    from: {
        name: string,
        avatar: string,
        email: string
    };
    to: {
        name: string,
        email: string
    }[];
    subject: string;
    message: string;
    time: string;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    attachments: {
        type: string,
        fileName: string,
        preview: string,
        url: string,
        size: string
    }[];
    labels: string[];
    folder: string;

    constructor(mail)
    {
        this.id = mail.id;
        this.from = mail.from;
        this.to = mail.to;
        this.subject = mail.subject;
        this.message = mail.message;
        this.time = mail.time;
        this.read = mail.read;
        this.starred = mail.starred;
        this.important = mail.important;
        this.hasAttachments = mail.hasAttachments;
        this.attachments = mail.attachments;
        this.labels = mail.labels;
        this.folder = mail.folder;
    }

    toggleStar()
    {
        this.starred = !this.starred;
    }

    toggleImportant()
    {
        this.important = !this.important;
    }

    markRead()
    {
        this.read = true;
    }

    markUnRead()
    {
        this.read = false;
    }
}
