from django.core.management.base import BaseCommand
from ipo_app.models import Company, IPO, Document
from datetime import date

class Command(BaseCommand):
    help = 'Seed IPO sample data'

    def handle(self, *args, **kwargs):
        Company.objects.all().delete()
        IPO.objects.all().delete()
        Document.objects.all().delete()

        c1 = Company.objects.create(company_name="Tata Technologies", company_logo="logos/tata.png")
        c2 = Company.objects.create(company_name="Ola Electric", company_logo="logos/ola.png")

        ipo1 = IPO.objects.create(
            company=c1,
            price_band="₹475 - ₹500",
            open_date=date(2025, 6, 15),
            close_date=date(2025, 6, 18),
            issue_size="₹3000 Cr",
            issue_type="Book Built Issue",
            listing_date=date(2025, 6, 25),
            status="upcoming",
            ipo_price=500.00
        )

        ipo2 = IPO.objects.create(
            company=c2,
            price_band="₹85 - ₹90",
            open_date=date(2025, 5, 10),
            close_date=date(2025, 5, 13),
            issue_size="₹1500 Cr",
            issue_type="Fixed Price Issue",
            listing_date=date(2025, 5, 20),
            status="listed",
            ipo_price=90.00,
            listing_price=100.00,
            current_market_price=95.00
        )

        Document.objects.create(ipo=ipo1, rhp_pdf="docs/tata_rhp.pdf", drhp_pdf="docs/tata_drhp.pdf")
        Document.objects.create(ipo=ipo2, rhp_pdf="docs/ola_rhp.pdf", drhp_pdf="docs/ola_drhp.pdf")

        self.stdout.write(self.style.SUCCESS("✅ Sample IPO data seeded successfully."))