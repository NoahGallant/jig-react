import styled from 'styled-components'

const Foot = ({ className, children }) => (
    <div className={className}>
        <a href="https://github.com/NoahGallant">Open source</a>.
        Made by <a href="https://twitter.com/nglnt">Noah</a> with help from <a href="https://twitter.com/sophstad">Sophie</a>.
    </div>
);

const Footer = styled(Foot)`
    margin-top:60px;
    margin-bottom:30px;
    border-top: 2px solid #EDF1F3;
    padding-top:20px;
    color: #CCD6DD;
    text-align:center;
    a{
        color:inherit;
        text-decoration:underline:
        
        &:hover{
            text-decoration:none;
        }
    }
`;

export default Footer