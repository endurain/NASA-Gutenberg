This is a custom Gutenberg block theme that allows for easily addition of new custom blocks. 

![LendEDU IMG](https://github.com/endurain/BM_React_Table/blob/main/image.png)

This project was built as an example for LendEDU as a method to showcase how certain blocks on the site could be created as custom Gutenberg blocks. This is just a demonstration.
![front](https://github.com/endurain/lendedu/assets/37851511/e8bf81b1-2d45-44ef-b23a-0a6a94378602)
![back](https://github.com/endurain/lendedu/assets/37851511/f8332310-91d4-4e67-8262-fa84e3e399e0)


# Getting Started with the theme locally

cd in project root and use 'npm install'. `npm run start` for development, `npm run build` to prepare for production and build newly added blocks.

# How blocks are registered 
/register-blocks.php handles the block registration. This theme allows for both static and dynamic blocks. Both versions were prepared in this project (financial-grid / financial-grid-items / financial-card-item are static, and financial-card is a dynamic block). Dynamic blocks need to have their block name added manually into line 7 of register-blocks.php. Then a corresponding render file in the respective block directory needs to be created.  

# Block Structure 
Each block has an attributes.json, where specific block meta is created, then pulled into the ./index.js for the block. There are corresponding front-end (syle.scss) and back-end (editor-style-scss) scss files for each block. Finally, an index.js where the front and backend features of a block is defined. 


