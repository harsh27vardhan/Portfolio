const Footer = () => {
    // const [year, setYear] = useState(new Date().getFullYear());

    return (
        <footer>
            <p>&copy; <span id="year">{new Date().getFullYear()}</span> Harsh Vardhan. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
