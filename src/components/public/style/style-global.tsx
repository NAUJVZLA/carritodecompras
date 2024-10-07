import styled from "styled-components"

export const Container = styled.div`
min-height: 100vh;


`

export const Main = styled.main`
padding: 3rem 1rem;
text-align: center;

h2 {
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 3rem;
}
`

export const CategoryGrid = styled.div`
display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 2rem;

@media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
}
`

export const NavList = styled.ul`
display: flex;                  
gap: 20px;                     
list-style-type: none;      
padding: 0;                  
margin: 0;   

color: #d4af37;
border-radius: 9999px;
text-decoration: none;
transition: background-color 0.3s, color 0.3s;

&:hover {
    color: #d4af37;
    color: #ffff;
}                
`;




export const CategoryCard = styled.div<{ hovered: boolean }>`
position: relative;
overflow: hidden;
border-radius: 0.75rem;
cursor: pointer;
transform: ${({ hovered }) => (hovered ? 'scale(1.05)' : 'scale(1)')};
transition: transform 0.3s ease;

img {
    width: 100%;
    height: 400px;
    object-fit: cover;
}

&:hover .overlay {
    opacity: 1;
}
`

export const Overlay = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
opacity: 0;
transition: opacity 0.3s ease;

h3 {
    font-size: 2rem;
    font-weight: 300;
}

svg {
    margin-left: 0.5rem;
    color: #d4af37;
}
`

export const ViewCollectionButton = styled.a`
display: inline-block;
margin-top: 4rem;
padding: 0.75rem 2rem;
border: 1px solid #d4af37;
color: #d4af37;
border-radius: 9999px;
text-decoration: none;
transition: background-color 0.3s, color 0.3s;

&:hover {
    background-color: #d4af37;
    color: #000;
}
`

export const Footer = styled.footer`
margin-top: 5rem;
padding: 1.5rem;
border-top: 1px solid #333;
text-align: center;
color: #888;
`