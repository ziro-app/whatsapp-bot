const responseObject = {
    "actions": [
        {
            "collect": {
                "name": "leads_ziro",
                "questions": [
                    {
                        "question": "5) A partir de quanto você vende um(a)"+ produto1,
                        "name": "venda_produto1",
                        "type": "Lista"
                    },
                    {
                        "question": "6) A partir de quanto você vende um(a)"+ produto2,
                        "name": "venda_produto2",
                        "type": "Lista"
                    },
                    {
                        "question": "7) A partir de quanto você vende um(a)"+ produto3,
                        "name": "venda_produto3",
                        "type": "Lista"
                    }
                ],
                "on_complete": {
                    "redirect": "https://whats.ziro.app/.netlify/functions/response"
                }
            }
        }
    ]


}