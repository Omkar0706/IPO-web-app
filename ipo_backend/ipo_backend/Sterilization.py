from rest_framework import serializers
from .models import Company, IPO, Document

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_logo']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'ipo', 'rhp_pdf', 'drhp_pdf']

class IPOSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source='company', write_only=True)
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    documents = serializers.SerializerMethodField()

    class Meta:
        model = IPO
        fields = [
            'id', 'company', 'company_id', 'price_band', 'open_date', 'close_date',
            'issue_size', 'issue_type', 'listing_date', 'status', 'ipo_price',
            'listing_price', 'current_market_price', 'listing_gain', 'current_return',
            'documents'
        ]

    def get_documents(self, obj):
        docs = Document.objects.filter(ipo=obj)
        return DocumentSerializer(docs, many=True).data