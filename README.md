This is a custom Gutenberg block theme that allows for easily addition of new custom blocks. 


# Getting Started with the theme locally

cd in project root and use 'npm install'. `npm run start` for development, `npm run build` to prepare for production and build newly added blocks.

# How blocks are registered 
/register-blocks.php handles the block registration. This theme allows for both static and dynamic blocks. Both versions were prepared in this project (grid / grid-items / card-item are static, and card is a dynamic block). Dynamic blocks need to have their block name added manually into line 7 of register-blocks.php. Then a corresponding render file in the respective block directory needs to be created.  

# Block Structure 
Each block has an attributes.json, where specific block meta is created, then pulled into the ./index.js for the block. There are corresponding front-end (syle.scss) and back-end (editor-style-scss) scss files for each block. Finally, an index.js where the front and backend features of a block is defined. 


